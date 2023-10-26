export interface IGradientColor {
  color1: string;
  color2: string;
}

export enum EFont {
  Quicksand_300Light = "Quicksand_300Light",
  Quicksand_400Regular = "Quicksand_400Regular",
  Quicksand_500Medium = "Quicksand_500Medium",
  Quicksand_600SemiBold = "Quicksand_600SemiBold",
  Quicksand_700Bold = "Quicksand_700Bold",
}

export enum EOperation {
  AddOperation = "+",
  SubtractOperation = "-",
}

export interface IQuiz {
  firstNum: number;
  secondNum: number;
  operation: string;
  choices: number[];
  answer: number;
}

export interface IQuizImage {
  imageSlot: number;
  choices: number[];
  answer: number;
}
export interface IQuizAnswer {
  choices: number[];
  answer: number;
}

export enum EQuizStatus {
  HIDDEN = "HIDDEN",
  ANSWER = "ANSWER",
}

export type IAnserTag = ChildNode | null;

export interface ILessons {
  [key: number]: {
    title: string;
    video: string;
    type: ELessonType;
    exams: any[];
  };
}

export interface IListBadges {
  [key: number]: {
    image: string;
  };
}

export enum ELessonType {
  OBJECTIVE_TEST, // 1 question, 1 image, 4 cau tra loi
  PICK_NUMBER, // hiển thị phép tính và chọn 1 trong 3 đáp án.
  MATCH_IMAGE, // hien thi cac anh va match dap an giong bài kiểm tra
  PICK_IMAGE,
  PICK_OPERATION,
  FILL_NUMBER, // tự điền giá trị
  SLIDE_NUMBER, // su dung slide de tim gia tri dung
  SLIDE_TIME, // dieu chinh thoi gian de check xem ket qua nao dung.
}
