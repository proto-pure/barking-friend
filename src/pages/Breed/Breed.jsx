import { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getBreedImages } from 'utils/utils';

import { Link } from 'components/Link';
import { BreedWrapper } from 'components/BreedWrapper';

/**
 * A component that renders the `Breed` section when the
 * user navigates to it
 */
const Breed = () => {
  const [breedImages, updateBreedImages] = useState([]);
  const breeds = useSelector(state => state.breeds);
  const params = useParams();
  const match = useRouteMatch('/breed/:breed');

  useEffect(() => {
    (async () => {
      const images = await getBreedImages(params, 10);

      updateBreedImages(images);
    })();
  }, [params]);

  return (
    <div className='page'>
      {breeds[params.breed] &&
        breeds[params.breed].map(breed => (
          <Link to={match.url + '/' + breed} key={breed}>
            {breed}
          </Link>
        ))}

      {breedImages.map((image, index) => (
        <BreedWrapper key={index} url={image} breed={params.breed} />
      ))}
    </div>
  );
};

export { Breed };
