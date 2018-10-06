declare module "react-images-upload" {

  export interface ImageUploaderProps {
    withLabel: boolean;
    withIcon: boolean;
    withPreview: boolean;
    singleImage: boolean;
    buttonStyles: object;
  }

  class ImageUploader extends React.Component<ImageUploaderProps, {}> {}

  export default ImageUploader;
}
