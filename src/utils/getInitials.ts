const getInitials = (name: string): string => {
  if (!name) {
    return '';
  }

  return name[0].toUpperCase();
};

export default getInitials;
