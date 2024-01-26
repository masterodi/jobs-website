const Footer = () => {
  return (
    <footer class="bg-primary-900 grid min-h-[40vh] place-items-center">
      <div class="container mx-auto">
        <ul class="flex justify-center gap-16 text-xl text-white">
          <li>
            <a href="#" class="hover:text-primary-100 transition-all duration-300 ease-in-out">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-100 transition-all duration-300 ease-in-out">
              Contact
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-100 transition-all duration-300 ease-in-out">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-100 transition-all duration-300 ease-in-out">
              What's next?
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
