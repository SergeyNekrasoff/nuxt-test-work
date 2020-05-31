<template>
    <div class="container">
        <div class="grid">
            <div class="item" v-if="currentItem !== null && Object.keys(currentItem).length">
                <div class="item__top">
                    <div>
                        <span>✏️</span>
                        <input class="item__field" type="text" v-model="name">
                    </div>
                    <p class="item__date">{{ currentItem.date }}</p>
                    <p class="item__price">price: {{ currentItem.price }}</p>
                </div>
                <div class="item__bottom">
                    <button 
                        class="btn"
                        type="button" 
                        @click="remove(currentItem.id)">
                        Удалить
                    </button>
                    <button 
                        class="btn"
                        type="button" 
                        @click="save()"
                        :disabled="status">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            status: true,
        }
    },
    watch: {
        'name': function(value) {
            if (this.currentItem.name !== value) {
                this.status = false
            } else {
                this.status = true
            }
        }
    },
    computed: {
        ...mapGetters({
            item: 'getCurrentItem'
        }),
        currentItem() {
            return this.item
        }
    },
    methods: {
        save() {
            const d = new Date()
            const curr_date = String(d.getDate()).padStart(2, '0')
            const curr_month = d.getMonth() + 1
            const curr_year = d.getFullYear()

            this.$store.commit('UPDATE_ITEM', { 
                id: this.currentItem.id,
                name: this.name,
                date: `${curr_date}/${curr_month}/${curr_year}`,
                price: this.currentItem.price
            })

            this.$router.push('/')
        },
        remove(id) {
            this.$store.commit('DELETE_ITEM', id)
            this.$router.push('/')
        },
        ...mapActions(['getItem'])
    },
    async mounted() {
        const response = await this.getItem(this.$route.params.id)
        this.name = response.name
    }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.grid {
  max-width: 1200px;
  width: 90%;
  min-width: 320px;
}

.item {
    border: 1px solid #ccc;
    margin-top: 100px;
    height: calc(60vh - 200px);

    &__date {
        font-size: .8rem;
        font-weight: bold;
        color: rgb(163, 163, 163);
    }

    &__price {
        font-weight: bold;
    }

    &__top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        height: 100px;
        width: 450px;
        margin: 0 auto;
    }

    &__field {
        border: 1px solid #ccc;
        height: 24px;
        line-height: 24px;
        padding: 4px 8px;
    }
}

.btn {
    border: 0;
    background: transparent;
    padding: 16px;
    cursor: pointer;
}
</style>