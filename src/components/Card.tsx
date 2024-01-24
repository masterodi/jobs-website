const Card = (props: any) => {
  return <div class="flex flex-col rounded-lg bg-gray-100 px-4 py-16">{props.children}</div>;
};

export default Card;
