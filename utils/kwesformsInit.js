export const kwesformsInit = async () => {
  const kwesforms = await import('kwesforms');
  await kwesforms.init();

  const forms = document.querySelectorAll('.kwes-form');
  forms.forEach((form) => {
    form.className = 'kwes-form-init d-print-none w-100';
  });
};
