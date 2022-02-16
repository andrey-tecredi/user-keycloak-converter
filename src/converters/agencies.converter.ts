import { constantData, KeycloakUserImportDto, MainExportFile } from '../dto/user.import.dto';
import { AgencySchema } from '../users/agencies';
import { phones } from '../users/phones';
import * as fs from 'fs';

export class AgenciesConverter {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    convert(data: Array<AgencySchema>): Array<KeycloakUserImportDto> {
        const users: KeycloakUserImportDto[] = data.map((u) => ({
            id: u.id.toString(),
            email: u.holder_email,
            username: u.identity,
            firstName: u.company_name,
            lastName: u.company_nick,
            createdTimestamp: Date.parse(u.created_at) / 1000,
            attributes: {
                ...u,
                type: 'cnpj',
                phone: phones
                    .filter((p) => p.phonable_id === u.id && p.type === 'Cel')
                    .map((f) => f.phone),
                fixPhone: phones
                    .filter((p) => p.phonable_id === u.id && p.type === 'Tel')
                    .map((f) => f.phone),
            },

            realmRoles: ['agencia', 'uma_authorization', 'default-roles-tecredi'],
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
