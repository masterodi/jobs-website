const Card = (props: any) => {
  return <div class="flex flex-col rounded-lg bg-indigo-900 fill-white px-4 py-16 text-white">{props.children}</div>;
};

export default Card;
