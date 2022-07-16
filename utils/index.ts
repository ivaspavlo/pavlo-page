export const onClickAnchorHandler = (scrollToId: string) => {
  document.getElementById(scrollToId)?.scrollIntoView();
};
