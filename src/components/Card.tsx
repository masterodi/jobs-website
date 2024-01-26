const Card = (props: any) => {
  return <div class="bg-primary-900 flex flex-col rounded-lg fill-white px-4 py-16 text-white">{props.children}</div>;
};

export default Card;
