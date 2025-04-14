import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from 'utils/twm';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 text-white text-base',
        selectBtn: '!rounded-default text-white text-base !mt-5',

        redBtn: 'text-base h-[50px] rounded-[11px] bg-[#F03A14] text-white ',
        greenBtn: 'text-base h-[50px] rounded-[11px] bg-[#00B94D] text-white ',
        DdeadlineBtn:
          'bg-[#FFFAEB] text-[#B54708] text-[1.2rem] font-medium px-[1rem] py-2',
        nowBtn:
          'bg-[#ECFDF3] text-[#027A48] text-[1.2rem] font-medium px-[1rem] py-2',
        blueBtn:
          'text-base h-[50px] rounded-[11px] bg-blue text-primary text-white font-normal; py-6 hover:text-#0606a6 border hover:border-[#0606a6] hover:bg-[#0606a6]',
        whiteBtn:
          'text-xs rounded-40 font-poppins bg-white hover:text-blue border hover:border-blue hover:bg-white',
        blackBtn: 'text-xs rounded-10 font-poppins bg-[#101828] text-white',
        leadBtnTab: 'text-xs rounded-40 font-poppins bg-white  border ',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-base',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primary:
          'bg-primary text-white hover:bg-blue-400/90 text-xs leading-loose',
        yellow:
          'bg-yellow-500 text-yellow-foreground hover:bg-yellow-400/90 text-xs px-8 py-10 leading-loose',
        secondary:
          'bg-yellow-500 text-dark hover:bg-yellow-400/90 text-xs leading-loose',
        carouselDot:
          'bg-primary rounded-none text-primary-foreground hover:bg-primary/90 h-[4px] w-12 opacity-70',
        carouselDotActive:
          'bg-primary rounded-none text-primary-foreground hover:bg-primary/90 h-[4px] w-12',
        white: 'bg-white text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
        blueBtn: 'h-[4.4rem]',
        whiteBtn: 'h-[4rem]',
        carouselArrow: 'h-20 w-15 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      // size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
