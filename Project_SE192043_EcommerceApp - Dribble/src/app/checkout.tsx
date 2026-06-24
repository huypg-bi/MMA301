import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { type ComponentProps, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '@/contexts/CartContext';
import { checkoutStyles as styles, fieldStyles } from '@/styles/checkout';
import { THEME } from '@/styles/theme';
import type { CheckoutForm } from '@/types';

type FieldErrors = Partial<Record<keyof CheckoutForm, string>>;

const EMPTY_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  phone: '',
};

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const PAYMENT_METHODS: { icon: IoniconsName; label: string }[] = [
  { icon: 'card-outline', label: 'Credit / Debit Card' },
  { icon: 'phone-portrait-outline', label: 'Apple Pay' },
  { icon: 'cash-outline', label: 'Cash on Delivery' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId] = useState(() => `ORD-${Math.floor(Math.random() * 900000) + 100000}`);
  const [selectedPayment, setSelectedPayment] = useState(0);

  const setField = (key: keyof CheckoutForm) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate() {
    const errs: FieldErrors = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{8,}$/.test(form.phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    clearCart();
    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={THEME.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>CHECKOUT</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 130 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDER SUMMARY</Text>
          {items.map((item) => (
            <View key={item.product.id} style={styles.orderItem}>
              <View style={styles.orderItemLeft}>
                <Text style={styles.orderItemQty}>{item.quantity}x</Text>
                <Text style={styles.orderItemName} numberOfLines={1}>
                  {item.product.title}
                </Text>
              </View>
              <Text style={styles.orderItemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.orderDivider} />
          <View style={styles.orderTotal}>
            <Text style={styles.orderTotalLabel}>Total</Text>
            <Text style={styles.orderTotalValue}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELIVERY INFORMATION</Text>
          <FormField
            label="Full Name"
            value={form.fullName}
            onChangeText={setField('fullName')}
            placeholder="e.g. John Doe"
            error={errors.fullName}
            autoComplete="name"
            returnKeyType="next"
          />
          <FormField
            label="Email Address"
            value={form.email}
            onChangeText={setField('email')}
            placeholder="e.g. john@example.com"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <FormField
            label="Phone Number"
            value={form.phone}
            onChangeText={setField('phone')}
            placeholder="e.g. +84 123 456 789"
            error={errors.phone}
            keyboardType="phone-pad"
            returnKeyType="next"
          />
          <FormField
            label="Delivery Address"
            value={form.address}
            onChangeText={setField('address')}
            placeholder="Street address"
            error={errors.address}
            multiline
            returnKeyType="next"
          />
          <FormField
            label="City"
            value={form.city}
            onChangeText={setField('city')}
            placeholder="e.g. Ho Chi Minh City"
            error={errors.city}
            returnKeyType="done"
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
          {PAYMENT_METHODS.map((method, index) => (
            <Pressable
              key={method.label}
              style={[
                styles.paymentOption,
                index === selectedPayment && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment(index)}
            >
              <Ionicons
                name={method.icon}
                size={22}
                color={index === selectedPayment ? THEME.colors.primary : THEME.colors.textSecondary}
              />
              <Text
                style={[
                  styles.paymentLabel,
                  index === selectedPayment && styles.paymentLabelSelected,
                ]}
              >
                {method.label}
              </Text>
              {index === selectedPayment && (
                <Ionicons name="checkmark-circle" size={20} color={THEME.colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <Pressable
          style={[styles.placeOrderBtn, isSubmitting && styles.placeOrderBtnDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting || items.length === 0}
        >
          <Text style={styles.placeOrderBtnText}>
            {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
          </Text>
        </Pressable>
      </View>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={72} color={THEME.colors.primary} />
            </View>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.orderId}>Order #{orderId}</Text>
            <View style={styles.successDetails}>
              <Text style={styles.successDetailTitle}>DELIVERY TO</Text>
              <Text style={styles.successDetailText}>{form.fullName}</Text>
              <Text style={styles.successDetailText}>
                {form.address}, {form.city}
              </Text>
              <Text style={styles.successDetailText}>{form.email}</Text>
              <Text style={styles.successDetailText}>{form.phone}</Text>
            </View>
            <View style={styles.successSummary}>
              <Text style={styles.successSummaryLabel}>Items ordered</Text>
              <Text style={styles.successSummaryValue}>
                {items.reduce((s, i) => s + i.quantity, 0)}
              </Text>
            </View>
            <View style={styles.successSummary}>
              <Text style={styles.successSummaryLabel}>Total paid</Text>
              <Text style={styles.successSummaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <Text style={styles.successNote}>
              A confirmation email will be sent to {form.email}
            </Text>
            <Pressable style={styles.successBtn} onPress={handleSuccessClose}>
              <Text style={styles.successBtnText}>CONTINUE SHOPPING</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: TextInput['props']['keyboardType'];
  autoCapitalize?: TextInput['props']['autoCapitalize'];
  autoComplete?: TextInput['props']['autoComplete'];
  returnKeyType?: TextInput['props']['returnKeyType'];
  multiline?: boolean;
};

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline,
  ...rest
}: FieldProps) {
  return (
    <View style={fieldStyles.container}>
      <Text style={fieldStyles.label}>{label}</Text>
      <TextInput
        style={[
          fieldStyles.input,
          error && fieldStyles.inputError,
          multiline && fieldStyles.multiline,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.textMuted}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        {...rest}
      />
      {error && <Text style={fieldStyles.error}>{error}</Text>}
    </View>
  );
}
