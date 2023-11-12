
interface Food {
    getEnergy() : void

}

class Cat {
    eat(food : Food) : void{
        food.getEnergy()
    }
}

class Sausage implements Food{
    getEnergy(): void {
        console.log('получил энергию')
    }

}

new Cat().eat(new Sausage())
