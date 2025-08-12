import { PulseLoader } from 'react-spinners'
import { useGetRestaurantsQuery } from '../../redux/api/restaurantsApi'
import { LoadingContainer } from '../../style/globalStyles'
import { ContentCard, ContentCardButton, ContentContainer, ContentList } from './ContentStyles'

export default function Content() {
  const { data: dataRestaurants = [], isLoading: loading, error } = useGetRestaurantsQuery()

  if (loading)
    return (
      <LoadingContainer>
        <PulseLoader color="#E66767" size={20} />
      </LoadingContainer>
    )

  if (error) return <p>Erro ao carregar restaurantes</p>
  return (
    <ContentContainer className="container">
      <ContentList>
        {dataRestaurants.map((restaurant: Restaurant) => (
          <ContentCard
            key={restaurant.id}
            restaurantId={restaurant.id.toString()}
            image={restaurant.capa}
            title={restaurant.titulo}
            description={restaurant.descricao}
            stars={restaurant.avaliacao}
            country={restaurant.tipo}
            highlight={restaurant.destacado}
          >
            <div>
              <ContentCardButton to={`/RestaurantPage/${restaurant.id}/${restaurant.titulo}`}>Saiba mais</ContentCardButton>
            </div>
          </ContentCard>
        ))}
      </ContentList>
    </ContentContainer>
  )
}
