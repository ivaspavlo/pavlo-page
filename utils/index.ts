export const onClickAnchorHandler = (scrollToId: string) => {
  document.getElementById(scrollToId)?.scrollIntoView();
};

export const copyClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
}
