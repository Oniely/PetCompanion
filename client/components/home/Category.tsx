import { View, Text } from 'react-native'
import CategoryItem from './CategoryItem'

const Category = () => {
   return (
     <View className='flex-1 mt-[24px]'>
        <View className='flex-row items-center justify-between'>
          <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-base text-dark-gray'>Category</Text>
          <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-base text-gray-500'>See All</Text>
        </View>
        <View className='flex-row justify-between'>
          <CategoryItem title='Onboarding' imageUrl={require('@/assets/images/dogo_care.jpg')} />
          <CategoryItem title='Onboarding' imageUrl={require('@/assets/images/dogo_care.jpg')} />
          <CategoryItem title='Onboarding' imageUrl={require('@/assets/images/dogo_care.jpg')} />
          <CategoryItem title='Onboarding' imageUrl={require('@/assets/images/dogo_care.jpg')} />
        </View>
     </View>
   )
}

export default Category