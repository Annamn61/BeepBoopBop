interface Props {
  value: string;
  children: React.ReactNode;
}

const FF = ({ value, children }: Props) => {
  const ff = localStorage.getItem(value);

  if (ff !== 'true') {
    return null;
  }

  return <>{children}</>;
};

export default FF;
