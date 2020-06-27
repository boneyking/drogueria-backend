export interface IRespuestaPaginada<T>{
	items: Array<T>;
	totalItems: number;
	totalDocumentos: number;
}