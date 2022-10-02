class ProductRecommendations extends window.HTMLElement {
  connectedCallback () {
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return
      observer.unobserve(this)

      fetch(this.dataset.url)
        .then(response => response.text())
        .then(text => {
          const html = document.createElement('div')
          html.innerHTML = text
          const recommendations = html.querySelector('product-recommendations')

          if (recommendations && recommendations.innerHTML.trim().length) {
            this.innerHTML = recommendations.innerHTML
          }

          if (!this.querySelector('slideshow-component') && this.classList.contains('complementary-products')) {
            this.remove()
          }

          if (html.querySelector('.grid__item')) {
            this.classList.add('product-recommendations--loaded')
          }
        })
        .catch(e => {
          console.error(e)
        })
    }

    new window.IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 400px 0px' }).observe(this)
  }
}

window.customElements.define('product-recommendations', ProductRecommendations)
