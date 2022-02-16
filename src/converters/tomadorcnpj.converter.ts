import { constantData, KeycloakUserImportDto, MainExportFile } from '../dto/user.import.dto';
import * as fs from 'fs';
import { CompanySchema } from '../users/company_companies';

export class TomadorCnpj {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    convert(data: Array<CompanySchema>): Array<KeycloakUserImportDto> {
        const users: KeycloakUserImportDto[] = data.map((u) => ({
            id: u.id.toString(),
            email: u.email,
            username: u.cnpj,
            firstName: u.company_name,
            lastName: '',
            createdTimestamp: Date.parse(u.created_at) / 1000,
            attributes: {
                ...u,
                type: 'cnpj',
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
