import {
  forwardRef,
  TextareaHTMLAttributes,
  ReactNode,
  MouseEvent,
} from "react";
import classNames from "classnames";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  errorMessage?: string;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  children?: ReactNode;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, errorMessage, onClick, children, className, ...props }, ref) => {
    const textareaClasses = classNames(
      "flex w-full flex-shrink-0",
      "items-center rounded-[1.6rem]",
      "min-h-[3rem] tablet:min-h-[4rem]",
      "px-[1.6rem] tablet:px-[2rem]",
      {
        "border-[0.2rem] border-primary": errorMessage,
        "border-[0.1rem] border-gray-300": !errorMessage,
      },
      "bg-white text-gray-800",
      "text-[1rem] tablet:text-[1.2rem] desktop:text-[1.4rem]",
      "hover:border-[0.2rem] hover:border-gray-800",
      "focus:border-[0.2rem] focus:border-primary focus:outline-none",
      className,
    );

    return (
      <div className="inline-flex w-full shrink-0 flex-col items-start gap-[0.3rem] ">
        {label && (
          <label
            htmlFor={props.id}
            className="font-sans text-[1rem] tablet:text-lg font-medium text-gray-800"
          >
            {label}
          </label>
        )}
        <textarea
          onClick={onClick}
          className={textareaClasses}
          ref={ref}
          rows={4}
          {...props}
        >
          {children}
        </textarea>
        {errorMessage && (
          <p className="ml-[0.5rem] font-sans text-[0.875rem] tablet:text-lg font-regular text-purple-100">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
