export interface AuthInput{
    nickname: string;
    email: string;
    password: string;
}

export interface PostInput{
    content: string;
    authorId: number;
    videoId: string;
    postId: number;
}