export interface Widget {
  id: string;
  name: string;
  addWidget: boolean;
  layout: LayoutType;
}

export interface ButtonProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export interface LayoutType {
  i: string | number;
  x: number;
  y: number;
  w: number;
  h: number;
}
