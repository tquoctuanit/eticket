<template>
  <!-- v-if="item.value=='myinfo'" -->
  <!--================ Tab info ==================-->
  <v-card-text class="my-info">
    <section class="avatar-wrapper">
      <div class="avatar">
        <img src="http://en.bcdn.biz/Images/2018/6/6/6483b0a6-667e-4209-9b66-5b4bce6b4e53.jpg">
      </div>
      <button @click="changeAvatarHandle" class="edit-btn">
        <v-icon>edit</v-icon>
      </button>
    </section>
    <!-- Info section -->
    <section>
      <div class="section-title">
        <div>Information</div>
        <div class="title-btn-wapper">
          <button v-if="enableInputInfo == false" @click="enableInputInfo = true">
            <v-icon>edit</v-icon>
          </button>
          <button v-if="enableInputInfo == true" @click="enableInputInfo = false">
            <v-icon>close</v-icon>
          </button>
          <button v-if="enableInputInfo == true" @click="handleInfoChange">
            <v-icon color="primary">send</v-icon>
          </button>
        </div>
      </div>
      <div class="section-content">
        <div class="input-50">
          <v-text-field
            prepend-icon="person"
            color="#ff9d72"
            label="First name"
            :disabled="!enableInputInfo"
            v-model="profileUser.first_name"
          ></v-text-field>
          <v-text-field
            prepend-icon="person"
            color="#ff9d72"
            :disabled="!enableInputInfo"
            v-model="profileUser.last_name"
            label="Last name"
          ></v-text-field>
        </div>
        <div class="input-50">
          <v-select
            prepend-icon="wc"
            color="#ff9d72"
            v-model="profileUser.gender"
            :disabled="!enableInputInfo"
            :items="gender_arr"
            label="Gender"
          ></v-select>
          <v-text-field
            prepend-icon="perm_contact_calendar"
            v-model="profileUser.dob"
            color="#ff9d72"
            label="D.O.B"
            :disabled="!enableInputInfo"
          ></v-text-field>
        </div>
        <v-textarea
          prepend-icon="list_alt"
          color="#ff9d72"
          v-model="profileUser.bio"
          label="Bio"
          :disabled="!enableInputInfo"
        ></v-textarea>

        <!-- Change pass dialog -->
        <v-dialog v-model="dialog" width="350">
          <template v-slot:activator="{ on }">
            <v-btn color="#FF4D00" light v-on="on">Change password</v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-4" primary-title>Change password</v-card-title>

            <v-card-text>
              <v-text-field
                prepend-icon="lock"
                color="#ff9d72"
                label="New password"
                type="password"
                required
                v-model="new_pass"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                color="#ff9d72"
                label="Confirm new password"
                type="password"
                required
                v-model="confirm_pass"
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <div v-if="error==='Change password successful!'" style="color: #4CAF50">{{error}}</div>
              <div v-else class="dialog-message" style="color: #FF5252">{{error}}</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="closeDialogHandle">Close</v-btn>
              <v-btn color="#FF4D00" dark @click="changePassHandle">Change</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End dialog -->
      </div>
    </section>
    <!-- Contact section -->
    <section>
      <div class="section-title">
        <div>Contact</div>
        <div class="title-btn-wapper">
          <button v-if="enableInputContact == false" @click="enableInputContact = true">
            <v-icon>edit</v-icon>
          </button>
          <button v-if="enableInputContact == true" @click="enableInputContact = false">
            <v-icon>close</v-icon>
          </button>
          <button v-if="enableInputContact == true" @click="handleContactChange">
            <v-icon color="primary">send</v-icon>
          </button>
        </div>
      </div>
      <div class="section-content">
        <div class="input-28">
          <v-text-field
            prepend-icon="store"
            color="#ff9d72"
            :disabled="!enableInputContact"
            v-model="profileUser.post_code"
            label="Post code"
          ></v-text-field>
          <v-text-field
            prepend-icon="phone"
            color="#ff9d72"
            :disabled="!enableInputContact"
            v-model="profileUser.phone_number"
            label="Phone number"
          ></v-text-field>
        </div>
        <v-text-field
          prepend-icon="place"
          color="#ff9d72"
          label="Address"
          :disabled="!enableInputContact"
          v-model="profileUser.address"
        ></v-text-field>
        <!-- <v-text-field
          color="#ff9d72"
          :disabled="!enableInputContact"
          v-model="profileUser.company"
          label="Company"
        ></v-text-field>-->
      </div>
    </section>
    <!-- Ví -->
    <section>
      <div class="section-title">
        <div>My wallet</div>
      </div>
      <div class="section-content">
        <v-text-field
          prepend-icon="account_balance_wallet"
          color="#ff9d72"
          disabled
          v-model="profileUser.cash"
          label="Account balance"
        ></v-text-field>
      </div>
    </section>
  </v-card-text>
</template>

<script>
import axios from "axios";

export default {
  props: {
    infoUser: {
      type: Object,
      required: true
    },
    profileUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tablinks: [
        { text: "Vé của tôi", value: "myticket" },
        { text: "Thông tin của tôi", value: "myinfo" }
      ],
      dialog: false,
      tabs: "true",
      error: "",
      //Information
      enableInputInfo: false,
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      bio: "",
      gender_arr: [{ text: "Male", value: 1 }, { text: "Female", value: 0 }],
      //COntact
      phone_number: "",
      address: "",
      post_code: "",
      company: "",
      enableInputContact: false,
      //Wallet
      wallet: 0,
      //Change pass dialog
      new_pass: "",
      confirm_pass: ""
    };
  },
  // created() {
  //   this.first_name = profileUser.first_name;
  // },
  methods: {
    changeAvatarHandle() {
      console.log("change avatar handle");
    },
    handleInfoChange() {
      console.log("info sent");
      this.enableInputInfo = false;
    },
    handleContactChange() {
      console.log("contact sent");
      this.enableInputContact = false;
    },
    clearInput(where) {
      if (where == "change_pass") {
        this.new_pass = "";
        this.confirm_pass = "";
      }
    },
    closeDialogHandle() {
      this.clearInput("change_pass");
      this.dialog = false;
    },
    changePassHandle() {
      let new_pass = this.new_pass;
      let confirm_pass = this.confirm_pass;
      let token = this.infoUser.access_token;
      if (new_pass === confirm_pass) {
        axios
          .post(
            "https://eticket-vhu.herokuapp.com/api/v1/auth/change-password",
            {
              email: new_pass, //varEmail is a variable which holds the email
              password: confirm_pass
            },
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(response => {
            this.error = response.data.message;
            setTimeout(() => {
              this.dialog = false;
              this.error = "";
            }, 2000);
          })
          .catch(e => {
            this.error = e.data.message;
          });
      } else {
        this.error = "Password is not match";
      }
      console.log("Change pass", new_pass, confirm_pass);
      this.clearInput("change_pass");
    }
  }
};
</script>
<style >
.color-white {
  color: white;
}
.v-tabs {
  min-height: calc(100vh - 64px - 102px);
}
.avatar-wrapper {
  width: 150px;
  margin: 35px auto;
  height: 150px;
  border: 1px solid #ebebeb;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(249, 232, 225, 0.87);
  position: relative;
}
.edit-btn {
  transition: 0.2s all ease-in-out;

  position: absolute;
  bottom: -60px;
  right: 0;
  width: 100%;
  height: 50px;
  z-index: inherit;
  background-color: #ffffffc7;
}
.edit-btn:hover i,
.my-info .section-title button:hover i {
  color: #ff4d00;
}
.avatar-wrapper:hover .edit-btn {
  bottom: -3px;
}
.avatar {
  width: 100%;
  height: 100%;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.my-info {
  max-width: 640px;
  margin: auto;
}
.my-info > section:not(.avatar-wrapper) {
  padding: 15px 0;
}
.my-info > section {
  margin-bottom: 15px;
}
.my-info .section-title {
  text-transform: uppercase;
  padding: 5px;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #ff9d72;
  border-bottom: 2px solid #ff9d72;
}
.section-content .v-input {
  max-width: 600px;
  margin: 5px 15px;
}
.section-content .v-btn {
  color: white;
}
.section-content > div:first-child {
  margin-top: 20px;
}
.section-content .v-input label {
  font-size: 14px;
}
.input-50,
.input-28 {
  display: flex;
  justify-content: space-between;
}
.input-50 .v-input {
  width: 50%;
}
.input-28 .v-input:first-child {
  width: 15%;
  min-width: 60px;
}
.input-28 .v-input:not(:first-child) {
  width: 85%;
  min-width: 60px;
}
.title-btn-wapper > button:not(:last-child) {
  margin-right: 20px;
}
</style>
