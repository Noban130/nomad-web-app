
import { Star01Icon, Star02Icon, Star03Icon, Star04Icon, Star05Icon, Star06Icon, Star07Icon, Star08Icon, Star09Icon, StarIcon } from '../../api/Icons';

export const getStar = (rating, num) => {
    let randomNumber = Math.random()

    let diff = parseFloat((rating - num).toFixed(1))

    if((diff === 0) || (diff < 0)) {
        return <StarIcon key={randomNumber*num} Colors={'#ddd'} />
    }
    else if(diff === 0.1) {
        return <Star01Icon key={randomNumber*num} />
    }
    else if(diff === 0.2) {
        return <Star02Icon key={randomNumber*num} />
    }
    else if(diff === 0.3) {
        return <Star03Icon key={randomNumber*num} />
    }
    else if(diff === 0.4) {
        return <Star04Icon key={randomNumber*num} />
    }
    else if(diff === 0.5) {
        return <Star05Icon key={randomNumber*num} />
    }
    else if(diff === 0.6) {
        return <Star06Icon key={randomNumber*num} />
    }
    else if(diff === 0.7) {
        return <Star07Icon key={randomNumber*num} />
    }
    else if(diff === 0.8) {
        return <Star08Icon key={randomNumber*num} />
    }
    else if(diff === 0.9) {
        return <Star09Icon key={randomNumber*num} />
    }
    else if (diff >= 1) {
        return <StarIcon key={randomNumber*num} Colors={'#DAABFF'} />
    }
}