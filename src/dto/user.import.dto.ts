export interface KeycloakUserImportDto {
    id?: string;
    createdTimestamp: number; //timestamp,
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    realmRoles: Array<RealmRoles>;
    clientRoles?: any; // acho que essa aqui nem vamos usar, só as realm roles mesmo. talvez mude no futuro
    attributes: {
        phone: string[],
        fixPhone?: string[]
        type: 'cnpj' | 'cpf'
    }
}

export interface MainExportFile {
    users: Array<KeycloakUserImportDto>;
}

/**
 * por enquanto vai esses, depois decidimos exatamente como será o sistema de roles e seus nomes
 * lembrando que "uma_authorization" é obrigatório
 */
export declare type RealmRoles = 'acionistas' | 'tomador-cpf' | 'tomador-cnpj' | 'agencia' | 'uma_authorization' | 'default-roles-tecredi'

export const constantData = {
    enabled: true,
    totp: false,
    emailVerified: true,
    credentials: [],
    disableableCredentialTypes: [],
    requiredActions: [],
};
