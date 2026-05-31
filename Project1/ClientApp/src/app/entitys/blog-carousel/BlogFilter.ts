
export enum eBlogFilterType {
  Author = 'author',
  Title = 'title',
  Date = 'date',
  Location = 'location',
  Clear = 'clear'
}


export interface BlogFilter {
    filterType: eBlogFilterType;
    value: string;
  }


  