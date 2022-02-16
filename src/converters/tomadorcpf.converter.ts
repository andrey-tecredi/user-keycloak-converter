import { constantData, KeycloakUserImportDto, MainExportFile } from '../dto/user.import.dto';
import * as fs from 'fs';
import { PeopleSchema } from '../users/people_people';

export class TomadorCpf {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    convert(data: Array<PeopleSchema>): Array<KeycloakUserImportDto> {
        const users: KeycloakUserImportDto[] = data.map((u) => ({
            id: u.id.toString(),
            email: u.email,
            username: u.cpf,
            firstName: u.name,
            lastName: '',
            createdTimestamp: Date.parse(u.created_at) / 1000,
            attributes: {
                ...u,
                type: 'cpf',
                phone: [u.phone],
            },

            realmRoles: ['tomador-cpf', 'uma_authorization', 'default-roles-tecredi'],
            ...constantData,
        }));

        return users;
    }

    export(data: Array<KeycloakUserImportDto>) {
        let json: MainExportFile = {
            users: data,
        };
        fs.writeFileSync(this.fileName + '.json', JSON.stringify(json));
    }
}
