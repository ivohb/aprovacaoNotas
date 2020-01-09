export interface UsuarioDto {
    id : string;
    codigo : string;
    senha : string;
    nome : string;
    email : string;
    cpf : string;
    imageUrl? : string; //(?) indica campo opcional - não vem do back end
}