export interface App {
    id: string;
    name: string;
  }
  
  export function fetchApps(): Promise<App[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'app-1', name: 'supertokens-golang' },
          { id: 'app-2', name: 'supertokens-java' },
          { id: 'app-3', name: 'supertokens-python' },
        ]);
      }, 800);
    });
  }
  