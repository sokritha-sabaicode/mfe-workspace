import { ReactNode } from "react";
export interface Props {
    children?: string | ReactNode;
    className?: string;
    hanldeOnClick: () => void;
}
declare const Button: ({ children, className, hanldeOnClick }: Props) => import("react/jsx-runtime").JSX.Element;
export default Button;
