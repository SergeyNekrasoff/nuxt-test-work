<template>
    <div class="productlist">
        <div v-if="itemsPage.length">
            <div class="productlist__sort">
                <button type="button" @click="addNew()">Add new +</button>
                <select 
                    class="select"
                    v-model="sorting"   >
                    <option value="" disabled selected hidden>Sort by</option>
                    <option value="date">date</option>
                    <option value="price">price</option>
                    <option value="">default</option>
                </select>
            </div>

            <div 
                class="productlist__item item"
                v-for="item in itemsPage"
                :key="item.id">
                <p class="item__date">{{ item.date }}</p>
                <nuxt-link 
                    class="item__name"
                    :to="`/item/${item.id}`">
                    {{ item.name }}
                </nuxt-link>
                <p class="item__price">Price: ${{ item.price }}</p>
                <button 
                    class="btn-remove"
                    type="button" 
                    @click="remove(item.id)">
                    ✖
                </button>
            </div>

            <ul class="pagination">
                <li
                    v-for="(page, index) in pages"
                    :key="index">
                    <span 
                        :class="['pagination__item', { 'active': page === currentPage }]"
                        @click="goTopPage(page)">
                        {{ page }}
                    </span>
                </li>
            </ul>
        </div>

        <div v-else>
            Product list is empty
            <button type="button" @click="addNew()">Add new +</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return {
            currentPage: 1,
            itemsPerPage: 2,
            sorting: '',
            pages: 0
        }
    },
    methods: {
        goTopPage(page) {
            this.currentPage = page
        },
        addNew() {
            const id = this.items.length ? 
                this.items[this.items.length - 1].id + 1 :
                1
            const d = new Date()
            const curr_date = String(d.getDate()).padStart(2, '0')
            const curr_month = d.getMonth() + 1
            const curr_year = d.getFullYear()

            this.$store.commit('ADD_ITEM', {
                id: id,
                name: `defailt-${id}`,
                date: `${curr_date}/${curr_month}/${curr_year}`,
                price: 100
            })
        },
        remove(id) {
            this.$store.commit('DELETE_ITEM', id)
        },
        ...mapActions(['getItems'])
    },
    watch: {
        'items': function(value) {
            this.pages = Math.ceil(parseInt(value.length) / 2)
        }
    },
    computed: {
        ...mapGetters({
            items: 'getItems'
        }),
        itemsPage() {
            const index = this.currentPage * this.itemsPerPage - this.itemsPerPage
            
            if (this.sorting === 'price') {
                const sortArr = this.items.slice().sort((a, b) => a.price - b.price)
                return sortArr.slice(index, index + this.itemsPerPage)
            } else if (this.sorting === 'date') {
                const sortArr = this.items.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                return sortArr.slice(index, index + this.itemsPerPage)
            } else {
                return this.items.slice(index, index + this.itemsPerPage)
            }
        }
    },
    async mounted() {
        if (this.items.length === 0) {
            const response = await this.getItems()
            this.pages = Math.ceil(parseInt(response.data.length) / 2)
        } else {
            this.pages = Math.ceil(parseInt(this.items.length) / 2)
        }
    }
}
</script>

<style lang="scss" scoped>
.productlist {
    padding-top: 100px;

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        height: 200px;
        padding: 16px;
        border: 1px solid #ccc;
        margin-bottom: 16px;
        position: relative;
    }

    &__sort {
        text-align: right;
        padding: 16px 0;

        .select {
            width: 100px;
            height: 24px;
        }
    }
}

.item {
    &__date {
        font-size: .8rem;
        font-weight: bold;
        color: rgb(163, 163, 163);
    }

    &__name {
        font-size: 1.4rem;
        text-decoration: none;
    }

    &__price {
        font-weight: bold;
    }
}

.pagination {
    list-style: none;
    text-align: right;

    li {
        display: inline-block;
        margin-left: 8px;
    }

    &__item {
        cursor: pointer;

        &.active {
            font-weight: bold;
        }
    }
}

.btn-remove {
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    width: 24px;
    height: 24px;
    line-height: 12px;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 6px;
    text-align: center;
}
</style>