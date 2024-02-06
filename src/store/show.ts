import { Show } from "@/types/Show";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

import ShowService from "@/services/ShowService";
import FirebaseService from "@/services/FirebaseService";

export const useShowStore = defineStore("shows", () => {
  const shows = ref<Show[]>([]);
  const showModal = ref(false);
  const modalData = ref<Show | null>(null);
  const favourites = ref([]);
  const favourtesShows = ref([]);
  const mostPopularShows = computed(() => {
    return shows.value.filter((show) => show.rating >= 8.5);
  });

  watch(
    shows,
    () => {
      getFavourites();
    },
    { deep: true }
  );

  watch(favourites, () => {
    getFavouriteShows();
    console.log(favourtesShows.value);
  });

  const fetchShows = () => {
    ShowService.getShows()
      .then((data) => {
        data.map(async (show: any) => {
          const numberOfSeasons = await fetchSeasons(show.id);
          shows.value.push({
            id: show.id,
            name: show.name,
            image: show.image.medium,
            imageOriginal: show.image.original,
            geners: show.genres,
            runtime: show.runtime,
            premiered: new Date(show.premiered),
            rating: show.rating.average,
            summary: show.summary,
            numberOfSeasons: numberOfSeasons,
          });
        });
      })
      .then(() => {
        getFavourites();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSeasons = async (id: number) => {
    let numberOfSeasons = 0;
    try {
      const data = await ShowService.getShowSeasons(id);
      numberOfSeasons = data.length;
    } catch (error) {
      console.error(error);
    }
    return numberOfSeasons;
  };

  const addFavourite = async (showId: number) => {
    try {
      await FirebaseService.addFavourite({ id: showId });
      getFavourites();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavourite = async (showId: string) => {
    try {
      await FirebaseService.removeFavourite(showId);
      getFavourites();
    } catch (error) {
      console.error(error);
    }
  };

  const getFavourites = () => {
    FirebaseService.getFavourites()
      .then((data) => {
        favourites.value = Object.keys(data).map((key) => {
          return { id: key, ...data[key] };
        });
      })
      .then(() => {
        getFavouriteShows();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFavouriteShows = () => {
    favourtesShows.value = shows.value.filter((show) => {
      return favourites.value.map((favourite: any) => favourite.id).includes(show.id);
    });
  };

  const isFavourite = (showId: number) => {
    return favourites.value.map((show: any) => show.id).includes(showId);
  };
  const hydrateModalData = (show: Show) => {
    modalData.value = show;
  };

  const showModalDetails = () => {
    showModal.value = true;
  };

  const hideModalDetails = () => {
    showModal.value = false;
  };

  return {
    shows,
    mostPopularShows,
    showModal,
    modalData,
    favourites,
    favourtesShows,
    isFavourite,
    fetchShows,
    showModalDetails,
    hideModalDetails,
    hydrateModalData,
    fetchSeasons,
    addFavourite,
    getFavourites,
    getFavouriteShows,
    removeFavourite,
  };
});
