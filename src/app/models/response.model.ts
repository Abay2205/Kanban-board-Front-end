export class ResponseModel {

    public readonly SUCCESS = 'success';
    public readonly ERROR = 'error';

    data: any;
    count: number;
    status: string;
    error_code: string;
    error_description: string;

    constructor(jsonObj: any) {
        if (jsonObj !== null) {
            this.data = jsonObj.data;
            this.count = jsonObj.count;
            this.status = jsonObj.status;
            this.error_code = jsonObj.error_code;
            this.error_description = jsonObj.error_description;
        }
    }

    public isSuccess(): boolean {
        return this.SUCCESS === this.status;
    }

    public isError(): boolean {
        return this.ERROR === this.status;
    }
}
