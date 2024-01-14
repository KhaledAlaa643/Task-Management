export interface Task {
  id?:number | any,
  name: string,
  status: string,
  description: string,
  tag:string,
  priority:string,
  category:string,
  date: string,
  checked: boolean,
  project:string
}
