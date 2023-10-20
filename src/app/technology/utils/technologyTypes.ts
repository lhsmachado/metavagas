interface TechnologyFindByNameResponse  {
    id: string;
    technology: string;
    createdAt: string | Date ;
    updatedAt: string | Date;
}

interface TechnologyCreateResponse  {
    technology: string;
    createdAt: string | Date ;
    updatedAt: string | Date;
}

export { TechnologyFindByNameResponse, TechnologyCreateResponse }