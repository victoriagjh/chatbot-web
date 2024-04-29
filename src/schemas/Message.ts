export interface Message {
    sender: 'user' | 'system'; // 발신자 타입
    content: string;           // 메시지 내용
    datetime: Date;            // 전송 시각
}
