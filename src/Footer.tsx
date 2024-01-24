const Footer = () => {
  return (
    <footer class="grid min-h-[40vh] place-items-center bg-indigo-900">
      <div class="container mx-auto">
        <ul class="flex justify-center gap-8 text-xl text-white">
          <li>
            <a href="#" class="transition-all duration-300 ease-in-out hover:text-indigo-100">
              About
            </a>
          </li>
          <li>
            <a href="#" class="transition-all duration-300 ease-in-out hover:text-indigo-100">
              Contact
            </a>
          </li>
          <li>
            <a href="#" class="transition-all duration-300 ease-in-out hover:text-indigo-100">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="transition-all duration-300 ease-in-out hover:text-indigo-100">
              What's next?
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
