import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'none';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  iconSize?: number
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  iconSize = 50,
  ...props
}) => {
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-[var(--secondary-color)] text-[var(--primary-color)] hover:text-white hover:bg-[#001A50]';
      break;
    case 'secondary':
      variantClasses = 'bg-[var(--secondary-color)] text-[var(--accent-color)] hover:bg-[#004CE8] hover:text-white';
      break;
    case 'accent':
      variantClasses = 'bg-[var(--accent-color)] text-[var(--secondary-color)] hover:text-[#004CE8] hover:bg-white';
      break;
    default:
      variantClasses = '';
  }

  return (
    <button
      onClick={onClick}
      className={` cursor-pointer px-4 py-2 rounded inline-flex items-center justify-center ${variantClasses} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="mr-2" size={iconSize}/>
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="ml-2" size={iconSize}/>
      )}
    </button>
  );
};

export default Button;
