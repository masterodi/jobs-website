import { createSignal } from 'solid-js';
import Button from '../../components/Button';
import Dialog from '../../components/Dialog';
import Input from '../../components/Input';
import InputLabeled from '../../components/InputLabeled';
import LoadingIndicator from '../../components/LoadingIndicator';
import Select from '../../components/Select';

const InternalStyling = () => {
  const [dialogOpen, setDialogOpen] = createSignal(false);

  return (
    <div class="grid gap-16">
      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Button</h2>
        <Button>Button</Button>
      </section>

      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Input</h2>
        <Input />
        <InputLabeled label="Label" />
      </section>

      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Select</h2>
        <Select options={['option 1', 'option 2', 'option 3', 'option 4']} />
      </section>

      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Card</h2>
      </section>

      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Loading</h2>
        <div>
          <LoadingIndicator />
        </div>
      </section>

      <section class="container mx-auto">
        <h2 class="mb-6 text-4xl font-bold">Dialog</h2>
        <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        <Dialog open={dialogOpen()} setOpen={setDialogOpen}>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium asperiores veritatis sint dolorem
            minima voluptatum voluptatibus exercitationem aut libero nostrum.
          </div>
        </Dialog>
      </section>
    </div>
  );
};

export default InternalStyling;
