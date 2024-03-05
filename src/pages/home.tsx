import HandshakeIcon from '../assets/icons/handshake.svg';
import RocketLunchIcon from '../assets/icons/rocket-lunch.svg';
import WorldIcon from '../assets/icons/world.svg';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  return (
    <>
      <header class="relative flex min-h-[80vh] items-center">
        <img
          src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute top-0 h-full w-full object-cover brightness-50"
        />

        <div class="container relative z-20 mx-auto px-4 py-16 text-lg text-white">
          <h1 class="text-center font-accent text-6xl font-bold leading-relaxed">
            Welcome to our premier job listing website!
          </h1>

          <p class="mt-8 text-2xl font-semibold leading-relaxed">
            Whether you are a recent graduate or an experienced professional, we are committed to providing a
            user-friendly platform that empowers you to explore, apply, and secure your dream job. Discover a vast range
            of employment options, from entry-level positions to executive roles, and join our community of job seekers
            as we strive to help you navigate the path towards your successful career.
          </p>
        </div>
      </header>

      <section>
        <div class="container mx-auto px-4 py-16">
          <h1 class="mb-16 text-center text-6xl font-bold">Why us?</h1>
          <div class="flex flex-col gap-4 lg:flex-row [&>*]:w-full">
            <Card variant="primary">
              <div class="mx-auto w-28 [&>svg]:h-full [&>svg]:w-full">
                <WorldIcon />
              </div>
              <div class="flex flex-1 flex-col items-center gap-6 p-8">
                <h3 class="text-2xl font-semibold">Worldwide</h3>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed non sapiente minus.
                </p>
              </div>
            </Card>

            <Card variant="primary">
              <div class="mx-auto w-28 [&>svg]:h-full [&>svg]:w-full">
                <RocketLunchIcon />
              </div>
              <div class="flex flex-1 flex-col items-center gap-6 p-8">
                <h3 class="text-2xl font-semibold">Fast search</h3>
                <p class="text-justify">Lorem ipsum dolor sit amet.</p>
              </div>
            </Card>

            <Card variant="primary">
              <div class="mx-auto w-28 [&>svg]:h-full [&>svg]:w-full">
                <HandshakeIcon />
              </div>
              <div class="flex flex-1 flex-col items-center gap-6 p-8">
                <h3 class="text-2xl font-semibold">Verified jobs</h3>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi incidunt iste officiis assumenda rerum
                  dicta.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section class="bg-neutral-100">
        <div class="container mx-auto px-4 py-16">
          <h1 class="mb-16 text-center text-6xl font-bold">What are you waiting for?</h1>
          <div>
            <Button fluid>
              <span class="flex h-24 items-center justify-center text-xl font-bold text-white">Start searching</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
