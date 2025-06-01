import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AsideBar from '../../components/asideBar/AsideBar'
import { RootState } from '../../redux/store'
import { getRestaurantById } from '../../utils/api'
import { RestaurantType } from '../content/Content'
import { HeaderContainer, HeaderImage, HeaderLogo, HeaderNavMenu, HeaderSpan, HeaderText, HeaderTitle, HomeContainer, NavItem } from './HeaderStyles'

const Header = () => {
  const { id } = useParams<{ id: string }>()
  const [showAsideBar, setShowAsideBar] = useState(false)
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
  const [loading, setLoading] = useState(true)

  const totalItems = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0))

  const handleOpenAsideBar = () => setShowAsideBar(true)
  const handleCloseAsideBar = () => setShowAsideBar(false)

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (id) {
          const data = await getRestaurantById(id)
          setRestaurant(data)
        }
      } catch (e) {
        console.error('Erro ao buscar restaurante', e)
        setRestaurant(null)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurant()
  }, [id])

  if (loading) return <p>Carregando restaurante...</p>

  return (
    <HeaderContainer>
      {id ? (
        <>
          <HeaderNavMenu className="container">
            <NavItem to="/">Restaurantes</NavItem>
            <HeaderLogo src="/images/logo.png" alt="Logo" />
            <HeaderSpan onClick={handleOpenAsideBar}>{totalItems} produto(s) no carrinho</HeaderSpan>
          </HeaderNavMenu>
          <div className="container">
            <HeaderTitle className="title">{restaurant?.titulo || 'Carregando...'}</HeaderTitle>
          </div>
          {restaurant?.capa && <HeaderImage src={restaurant.capa} alt={restaurant.titulo} />}
        </>
      ) : (
        <HomeContainer>
          <HeaderLogo src="/images/logo.png" alt="Logo" />
          <HeaderText>Viva experiências gastronômicas no conforto da sua casa!</HeaderText>
        </HomeContainer>
      )}
      {showAsideBar && <AsideBar onClose={handleCloseAsideBar} />}
    </HeaderContainer>
  )
}

export default Header
