<template>
  <div id="dashboard-wrapper">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h4 class="text-md-center">{{ randomQuote }}</h4>
      </div>
    </div>

    <div id="quick-navigation" class="row justify-content-center align-items-top">
      <div class="col-md-8">
        <div class="card-deck">
          <router-link to="/dharma" tag="div" class="card">Q&A</router-link>
          <router-link to="/event" tag="div" class="card">Event</router-link>
        </div>
        <div class="card-deck">
          <router-link to="/blog" tag="div" class="card">Blog</router-link>
          <router-link to="/files" tag="div" class="card">Files</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        quotes: [
          "If you are unsure of something, you can ask someone and find out, If you make a mistake, you can correct it And if you do something wrong, you just need to repent. Then, you don’t need to be afraid of anything in life. This is the way you can take ownership of your life. The minute you realize that the most important being in the world is you, anything becomes possible.",
          "I create my own happiness. I create my own suffering. Truly, no one else can create my happiness or suffering.",
          "The purpose of prayer isn’t to change others, To seek blessings, Or to obtain what we desire. The purpose of prayer is to develop an inner strength. That will enable us to accept any situation that we may face in life.",
          "A tree does not cast shade So that people can rest beneath. A tree simply exists And shade occurs naturally. Don’t exert yourself to help others. Simply place the main focus on your own life. Being true to yourself And cherishing yourself Are the ways to help yourself, As well as others.",
          "When told “You are over-reacting,” Accept it as it is by simply thinking, “Ah, I over-reacted.” When told “I didn’t swear,” Accept it just as it is by simply thinking, “Oh, you didn’t swear. I only perceived it that way.” Neither conflicts nor emotional afflictions arise when you accept things as they are.",
          "Why does conflict begin between people? We all think differently. Yet, we tend to think, “I am right, and you are wrong.” This creates conflict. When you have a conflict, instead of thinking of a way to get rid of the conflict, We simply should reflect upon ourselves and acknowledge, “Everyone’s thoughts are just different, but I have been insisting that my thoughts are right.” Everyone thinks differently. And, we need to realize that everyone is right from his own perspective.",
          "The purpose of prayer isn’t to change others, To seek blessings, Or to obtain what we desire. The purpose of prayer is to develop an inner strength That will enable us to accept any situation that we may face in life.",
          "Emotions arise subconsciously. They arise before one realizes “I shouldn’t be this way.” Therefore, it does not help to regret, “I shouldn’t have done that” After the emotions have already arisen. Such thoughts will only lead to self-criticism. Just be aware, “I was caught up in my emotions.” Then the mind will be at ease and will be less likely to get caught up in the spiral of negative emotions.",
          "We can live happily in any situation. An unwise person will fall into despair when faced with a difficulty such as being blocked by a cliff while mountain climbing. However, a wise person will think “I am so glad I made it this far”, and either decide to turn around and go back or look for a way to climb past the obstacle. We are unhappy, not because of a certain situation but because of our inability to deal with that situation.",
          "There was a person who died from a car accident after visiting a friend with a terminal cancer. It turned out that he had comforted his friend who had a year to live when he himself had only one day to live. We don’t know when the moment of death will arrive. But we waste our lives day by day as if we will live forever. If we live today as if it were the last day of our lives, we won’t have any regrets even if we die tomorrow.",
          "Looking at the same flower, Some people weep While others smile and sing. Flowers that make us sing And flowers that make us weep Are not different kinds of flowers. It is the mind That creates the different reactions.",
          "If the teacup in your hand is hot, You can simply put it down. You are in agony because it is hot, So why do you keep holding onto it?",
          "Letting go of the notion, “I’m better,” and “I’m right,” Try to empathize with others Who struggle in life just like you.",
          "Practice is Realizing that there’s nothing more to gain So you can be at peace Right here, right now.",
          "Be mindful When taking your shoes off. Be mindful When mopping the floor. Be fully mindful When eating or studying.",
          "Clean diligently,If you have to clean. Sing wholeheartedly, If you have to sing. Just as water has no fixed form, Adapting yourself to the environment Is practice.",
          "Someone who knows how to love in a mature way Does not burden others with expectations Or trouble them with dependency. He just understands them And gladly extends his help when they want it.",
          "Not tomorrow, not later, Be happy at this very moment. Being content at this moment is happiness.",
          "Everything originates from us And comes back to us. What comes back to us As a result of our own deeds Cannot be avoided Even if we hide in the most remote mountains Or in the deepest oceans. Likewise, an act of kindness we perform, Though not in the form we want Or at the time we want, Will surely return to us. When we understand this principle, Life becomes happier and more relaxed.",
          "All that exists in this world Will inevitably perish. Suffering that seems to last forever Eventually disappears. So do sickness and happy moments. It is a principle of life that everything changes. With this realization, Aging or dying can be regarded As just a process of change, Not something to be overly happy about Or agonize over.",
          "Just as we tumble and fall When we learn how to ride a bike, We become mature By repeating failures Yet continuing to practice. If we accept failure Not as despair but as experience, We can lead A free and happy life.",
          "When you admire the beauty of a flower, It is not the flower, but you who feel good. Likewise, when you cherish and love someone, It is not that person, but you who are happy. To cherish and love others Is to love yourself.",
          "You feel empty inside Because of your greed And the expectation you have of others. Let go of your desire to fill up your life. Then, the feeling of emptiness will disappear.",
          "Please do not imbue your life With too much meaning, Talking about “goals” and “purpose.” Since you have a roof over your head tonight, What reason Is there to be so anxious about in life?",
          "When we are being chased in a dream, We mistakenly believe That the attacker is causing the suffering. However, once we wake up from the dream, We find that there is actually no problem In reality. It is not that our suffering disappeared Rather, there was nothing Causing us suffering In the first place.",
          "Two men are plowing in the field. At first glance it’s hard to tell Who is the landowner and who is the hired help. However, after the work is done, The one who shows gratitude Or pays is the landowner. To give, in fact, Is the way to become a master. One who receives Follows the path of servitude. The essence of “good deeds” Does not lie in being helpful to others. The reason you should be generous to others Is that when you perform good deeds, You immediately feel happy And become the master of your life.Why not live a life of generosity And become the proud master of your life?"
        ]
      }
    },
    computed: {
      randomQuote () {
        let vm = this
        let data = _.sample(vm.quotes, 1)
        return data[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables.scss';
  @import '../scss/global.scss';

  h4 {
    font-family: $accent-font;
    color: $color2;
    text-transform: initial;
    font-weight: normal;
    margin: 100px auto;
  }

  #quick-navigation {
    margin-bottom: 100px;
    
    .card {
      @extend .flex-default;
      margin-top: 10px;
      height: 100px;
      color: $color4;
      font-weight: bold;
      font-size: $fsize4;
      text-transform: uppercase;
      letter-spacing: 2px;
      border-color: $color4;
      cursor: pointer;
      &:hover, &:focus {
        background-color: $color4;
        color: $base-white;
      }
    }
  }
</style>
