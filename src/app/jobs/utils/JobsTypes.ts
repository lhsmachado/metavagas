export type DataPersistType = {
    position?:string,
    city:string,
    uf:string,
    website?:string,
    company?:string,
    description?: string,
    link?:string,
    localType?: string,
    salary?:number,
    jobType?: string,
    companySize?:string,
    technology?:Array<string>,
    experience?:string
}

export type DataType = {
    position?:string,
    cityID?:string,
    website?:string,
    company?:string,
    description?: string,
    link?:string,
    localType?: string,
    salary?:number,
    jobType?: string,
    companySize?:string,
    technology?:Array<string>,
    experience?:string
}

export type QueryType = {
    position?:any,
    cityID?:string,
    website?:string,
    company?:string,
    description?: any,
    link?:string,
    localType?: string,
    salary?:any,
    minSalary?:number,
    maxSalary?:number,
    jobType?: string,
    companySize?:string,
    technology?:any,
    experience?:string,
    page?:number,
    limit?:number
}

export type OptionsType = {
    page:number,
    limit:number
}
