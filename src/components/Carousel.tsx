import { For, createContext, createSignal, useContext } from 'solid-js';

const CarouselContext = createContext();

export const useCarouselContext = () => {
  const ctx = useContext(CarouselContext);

  if (!ctx) {
    throw new Error('useCarouselContext must be called inside a child');
  }

  return ctx;
};

const Carousel = (props: any) => {
  const [index, setIndex] = createSignal(0);

  return (
    <CarouselContext.Provider value={{ index, setIndex }}>
      <div class="h-full w-full">
        <div class="flex h-full w-full overflow-hidden">
          <For each={props.children}>
            {(child, i) => (
              <div
                class="h-full w-full flex-shrink-0 flex-grow-0 transition-all duration-300 ease-in-out"
                style={{ translate: `${-100 * index()}%` }}
              >
                {child}
              </div>
            )}
          </For>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export default Carousel;
