import { gql } from 'apollo-boost';

export default gql`
  query Homepage($id: String!, $preview: Boolean!) {
    homepage(id: $id, preview: $preview) {
      header
      subtext
      image {
        url
      }
    }
  }
`;
