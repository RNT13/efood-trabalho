import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import Popup from '../../components/popup/Popup'
import { PopupButton } from '../../components/popup/PopupStyles'
import { useGetRestaurantByIdQuery } from '../../redux/api/restaurantsApi'
import { addToCart } from '../../redux/slices/cartSlice'
import { LoadingContainer } from '../../style/globalStyles'
import { RestaurantCardButton, RestaurantPageCard, RestaurantPageContainer, RestaurantPageContent } from './RestaurantPageStyles'

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState<Food | null>(null)

  const { data: restaurant, isLoading: loading } = useGetRestaurantByIdQuery(id as string, { skip: !id })

  if (loading)
    return (
      <LoadingContainer>
        <PulseLoader color="#E66767" size={20} />
      </LoadingContainer>
    )

  if (!restaurant) return <p>Restaurante não encontrado</p>

  const handleOpenPopup = (food: Food) => {
    setPopupData(food)
    setShowPopup(true)
  }

  const handleAddToCart = () => {
    if (popupData) {
      dispatch(
        addToCart({
          foodId: popupData.id.toString(),
          name: popupData.nome,
          price: Number(popupData.preco),
          image: popupData.foto
        })
      )
      setShowPopup(false)
    }
  }

  const handleClosePopup = () => setShowPopup(false)

  return (
    <RestaurantPageContainer className="container">
      <RestaurantPageContent>
        {restaurant.cardapio.map((food: Food) => (
          <RestaurantPageCard
            key={food.id}
            image={food.foto}
            title={food.nome}
            description={food.descricao.length > 135 ? food.descricao.slice(0, 135) + '...' : food.descricao}
            foodId={food.id.toString()}
          >
            <RestaurantCardButton onClick={() => handleOpenPopup(food)}>Ver Prato</RestaurantCardButton>
          </RestaurantPageCard>
        ))}
      </RestaurantPageContent>

      {showPopup && popupData && (
        <Popup message={popupData.porcao} onClose={handleClosePopup} image={popupData.foto} desdcription={popupData.descricao} title={popupData.nome}>
          <PopupButton onClick={handleAddToCart}>Adicionar ao carrinho - R$ {popupData.preco.toFixed(2).replace('.', ',')}</PopupButton>
        </Popup>
      )}
    </RestaurantPageContainer>
  )
}
