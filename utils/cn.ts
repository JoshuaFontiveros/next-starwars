import { ClassValue } from 'clsx';

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}

export default cn;
