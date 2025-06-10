import { useGetRestaurantsQuery } from '../../redux/api/restaurantsApi'
import { ContentCard, ContentCardButton, ContentContainer, ContentList } from './ContentStyles'

const Content = () => {
  const { data: restaurants = [], isLoading: loading, error } = useGetRestaurantsQuery()

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar restaurantes</p>

  return (
    <ContentContainer className="container">
      <ContentList>
        {restaurants.map(restaurantType => (
          <ContentCard
            key={restaurantType.id}
            restaurantId={restaurantType.id.toString()}
            image={restaurantType.capa}
            title={restaurantType.titulo}
            description={restaurantType.descricao}
            stars={restaurantType.avaliacao}
            country={restaurantType.tipo}
            highlight={restaurantType.destacado}
          >
            <ContentCardButton to={`/RestaurantPage/${restaurantType.id}/${restaurantType.titulo}`}>Saiba mais</ContentCardButton>
          </ContentCard>
        ))}
      </ContentList>
    </ContentContainer>
  )
}

export default Content
