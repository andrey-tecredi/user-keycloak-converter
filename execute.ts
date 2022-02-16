import { AgenciesConverter } from './src/converters/agencies.converter';
import { TomadorCnpj } from './src/converters/tomadorcnpj.converter';
import { TomadorCpf } from './src/converters/tomadorcpf.converter';
import { agencies } from './src/users/agencies';
import { companies } from './src/users/company_companies';
import { people } from './src/users/people_people';

const a = new AgenciesConverter('agencias');
const b = new TomadorCnpj('tomador-cnpj');
const c = new TomadorCpf('tomador-cpf');

try {
    const users = a.convert(agencies);
    a.export(users as any);
} catch (e) {
    console.log(e);
}

try {
    const users = b.convert(companies);
    b.export(users as any);
} catch (e) {
    console.log(e);
}

try {
    const users = c.convert(people);
    c.export(users as any);
} catch (e) {
    console.log(e);
}
