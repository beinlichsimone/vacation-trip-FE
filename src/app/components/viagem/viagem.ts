export class Content {
    id: number;
    nome: string;
    descricao: string;
    dataIda: Date;
    dataVolta: Date;
}

export class Viagem{
    content: Content[];
}