
export interface IAttack {
    _id: string;
    type: string;
    description: string;
    reportedBy: IUser;
    createdAt: string; // Consider using Date if needed
    updatedAt: string; // Consider using Date if needed
    __v: number;
}

export type Quiz = {
    _id: string;
    title: string;
    questions: Question[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type Question = {
    _id: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
  };

export interface IUser {
    _id:string;
    userName:string;
    quizzes:Quiz[];
    attacks:IAttack[];
    phone:string;
}



export interface IAttackResponse {
    docs: IAttack[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
